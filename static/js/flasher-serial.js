"use strict";

import { SerialPortFtdi } from './serialport-ftdi.js';

const ACK = 0x79;
const NACK = 0x1F;

const BOOTLOADER_VERSION = Uint8Array.from([0x31, 0x00, 0x00]);
const BOOTLOADER_ID = Uint8Array.from([0x01, 0x04, 0x47]);
const START_ADDRESS = 0x08000000;

const COMMAND_GET_VERSION = Uint8Array.from([0x01, 0xfe]);
const COMMAND_GET_ID = Uint8Array.from([0x02, 0xfd]);
const COMMAND_GO = Uint8Array.from([0x21, 0xde]);
const COMMAND_MEMORY_READ = Uint8Array.from([0x11, 0xee]);
const COMMAND_MEMORY_WRITE = Uint8Array.from([0x31, 0xce]);
const COMMAND_EX_ERASE_MEMORY = Uint8Array.from([0x44, 0xbb]);

const ERASE_FULL = 196608;
class FlashSerial {

  constructor(/*device*/) {

    this.connect = this.connect.bind(this);
    this.start_bootloader = this.start_bootloader.bind(this);
    this.get_version = this.get_version.bind(this);
    this.get_ID = this.get_ID.bind(this);

    this._wait_for_ack = this._wait_for_ack.bind(this);
    this._read = this._read.bind(this);

    this.memory_read = this.memory_read.bind(this);
    this.memory_write = this.memory_write.bind(this);
    this.extended_erase_memory = this.extended_erase_memory.bind(this);
    this.go = this.go.bind(this);
    this.erase = this.erase.bind(this);
    this.write = this.write.bind(this);
    this.verify = this.verify.bind(this);

    this._ser = new SerialPortFtdi();
  }


  compare(a, b) {
    for (let i = a.length; -1 < i; i -= 1) {
      if ((a[i] !== b[i])) return false;
    }
    return true;
  }

  _connect() {
    return new Promise((resolve, reject) => {
      console.log("_connect");
      this.start_bootloader()
        .then(() => {
          return this.get_version();
        })
        .then((version) => {
          if (!this.compare(BOOTLOADER_VERSION, version)) {
            throw 'Bad version';
          }

          return this.get_ID();
        })
        .then((id) => {
          if (!this.compare(BOOTLOADER_ID, id)) {
            throw 'Bad id';
          }
        })
        .then(resolve)
        .catch(reject)
    });
  }

  async connect() {
      for (let i = 0; i < 10; i++) {
          console.log("FlashSerial: try connect", i);
          try {
              await this._ser.open();
              await this._connect();
              return true;
          } catch (error) {
              console.log('FlashSerial: connect error', error);
              await this._ser.close().catch(() => { });
              await sleep.msleep(100);
          }
      }
      throw 'Connection error';
  }

  disconect() {
      return this._ser.close();
  }

  start_bootloader() {
    console.log('start_bootloader');

    return new Promise((resolve, reject) => {

      let buffer = Uint8Array.from([0x7f]);
      let recieve_buffer = new ArrayBuffer(1);

      this._ser.boot_sequence()
        .then(() => {
          //return this._ser.clear_buffer();
        })
        .then(() => {
          return new Promise(resolve => setTimeout(resolve, 100));
        })
        .then(() => {
          return this._ser.write(buffer);
        })
        .then(async () => {
          return this._read(this._ser.reader, recieve_buffer);
        })
        .then((buffer) => {
          buffer = new Uint8Array(buffer)
          if ((buffer.byteLength == 1) && (buffer[0] == ACK)) {
            resolve();
          } else {
            reject("start bootloader expect ACK");
          }
        })
        .catch((e)=>{
          console.log(e);
            reject("Error start bootloader");
        });
    });
  }

  get_version() {
    return new Promise((resolve, reject) => {
      let outBuffer = new ArrayBuffer(5);

      this._ser.write(COMMAND_GET_VERSION)
        .then(() => {
          return this._read(this._ser.reader, outBuffer);
        })
        .then((outBuffer) => {
          outBuffer = new Uint8Array(outBuffer)
          if ((outBuffer[0] == ACK) && outBuffer[4] == ACK) {
            resolve(outBuffer.subarray(1, 4))
          } else {
            reject('fail get_version');
          }
        })
        .catch(reject);

    });
  }

  get_ID() {
    return new Promise((resolve, reject) => {
      let outBuffer = new ArrayBuffer(5);

      this._ser.write(COMMAND_GET_ID)
        .then(() => {
          return this._read(this._ser.reader, outBuffer);
        })
        .then((outBuffer) => {
          outBuffer = new Uint8Array(outBuffer)
          if ((outBuffer[0] == ACK) && outBuffer[4] == ACK) {
            resolve(outBuffer.subarray(1, 4))
          } else {
            reject('fail get_ID');
          }
        })
        .catch(reject);

    });
  }

  _get_address_buffer_with_xor(address) {
    var buff = new Uint8Array(5);
    buff[0] = address >> 24;
    buff[1] = address >> 16;
    buff[2] = address >>  8;
    buff[3] = address;
    buff[4] = 0;
    for (let i = 0; i < 4; i++) {
      buff[4] ^= buff[i];
    }
    return buff;
  }

  _calculate_xor(buffer, length) {
    let xor = 0;
    for (let i = 0, l = length || buffer.length; i < l; i++) {
      xor ^= buffer[i];
    }
    return xor;
  }

  _wait_for_ack() {
    let recieve_buffer = new ArrayBuffer(1);

    return new Promise((resolve, reject) => {
      this._read(this._ser.reader, recieve_buffer)
        .then((buffer) => {
          buffer = new Uint8Array(buffer)
          if (buffer[0] == ACK) {
            resolve();
          } else {
            reject('Expect ACK');
          }
        })
        .catch(reject);
    });
  }

  async _read(reader, buffer, timeout = 1000) {
    let offset = 0;
    let length = buffer.byteLength;
    let outBuffer = new ArrayBuffer(buffer.byteLength);
    let outUintBuffer = new Uint8Array(outBuffer);
    while (offset < length) {
      const { value, done } = await reader.read(
        new Uint8Array(buffer, offset)
      );
      if (done) {
        break;
      }
      let buf = new Uint8Array(value.buffer)
      outUintBuffer.set(buf, [offset]);
      offset += value.byteLength;
    }
    return outBuffer;
    }

  memory_read(start_address, length) {
    return new Promise((resolve, reject) => {
      if ((length > 256) || (length < 0)) {
        return reject('Bad length min 1 max 256');
      }

      let readBuffer = new Uint8Array(length < 3 ? 3 : length);

      let address_buf = this._get_address_buffer_with_xor(start_address);

      let n = length - 1;

      let length_buf = Uint8Array.from([n, 0xff ^ n]);

      this._ser.write(COMMAND_MEMORY_READ)
        .then(() => {
          return this._ser.write(address_buf);
        })
        .then(() => {
          return this._ser.write(length_buf);
        })
        .then(() => {
          return this._read(this._ser.reader, readBuffer);
        })
        .then((buffer) => {
          buffer = new Uint8Array(buffer);
          if ((buffer[0] & buffer[1] & buffer[2]) != ACK) {

            throw 'Expect ACK'
          }
        })
        .then(() => {
          return this._read(this._ser.reader, readBuffer);
        })
        .then((buffer) => {
          buffer = new Uint8Array(buffer);
          if (l == length) {
            resolve(readBuffer);
          } else {
            console.log(l, length);
            reject('Bad receive length');
          }
        })
        .catch(reject);
    });
  }

  memory_write(start_address, buffer) {
    return new Promise((resolve, reject) => {
      if ((buffer.length > 256)) {
        return reject('Bad length max 256 ');
      }

      if ((buffer.length % 4 != 0)) {
        return reject('Bad length must by mod 4');
      }

      let recieve_buffer = new ArrayBuffer(2);

      let address_buf = this._get_address_buffer_with_xor(start_address);

      let n = buffer.length - 1;

      let wbuff = Uint8Array.from([n]);

      let buffer_xor = this._calculate_xor(buffer);

      this._ser.write(COMMAND_MEMORY_WRITE)
        .then(() => {
          return this._ser.write(address_buf);
        })
        .then(() => {
          return this._read(this._ser.reader, recieve_buffer);
        })
        .then((readBuffer) => {
          readBuffer = new Uint8Array(readBuffer)
          if ((readBuffer[0] & readBuffer[1]) != ACK) {
            if ((ret.bytesRead == 1) && (readBuffer[0] == ACK)) {
              return this._wait_for_ack();
            }

            throw 'Expect ACK'
          }
        })
        .then(() => {
          return this._ser.write(wbuff);
        })
        .then(() => {
          return this._ser.write(buffer);
        })
        .then(() => {
          wbuff[0] = n ^ buffer_xor;
          return this._ser.write(wbuff);
        })
        .then(this._wait_for_ack)
        .then(resolve)
        .catch(reject);
    });
  }

  extended_erase_memory(pages) {
    return new Promise((resolve, reject) => {
      if (!pages || (pages.length == 0) || (pages.length > 80)) {
        return reject("Bad number of pages");
      }

      let buffer = new Uint8Array(3 + (pages.length * 2));

      buffer[0] = 0x00;
      buffer[1] = pages.length - 1;

      let offset = 3;

      for (let i = 0, l = pages.length; i < l; i++) {
        buffer[offset++] = pages[i] & 0xff;
        buffer[offset++] = pages[i] >> 8;
      }

      buffer[--offset] = this._calculate_xor(buffer, offset);

      this._ser.write(COMMAND_EX_ERASE_MEMORY)
        .then(this._wait_for_ack)
        .then(() => {
          return this._ser.write(buffer);
        })
        .then(this._wait_for_ack)
        .then(resolve)
        .catch(reject);
    });
  }

  go(start_address = START_ADDRESS) {
    return new Promise((resolve, reject) => {
      let address_buf = this._get_address_buffer_with_xor(start_address);

      this._ser.write(COMMAND_GO)
        .then(this._wait_for_ack)
        .then(() => {
          return this._ser.write(address_buf);
        })
        .then(this._wait_for_ack)
        .then(resolve)
        .catch(reject);
    });
  }

    async erase(length = 196608, reporthook = null) {
        let max_page = Math.ceil(length / 128) + 1

        if (max_page > 1536) {
            max_page = 1536
        }

        if (reporthook) reporthook(0, max_page);
        for (let page_start = 0; page_start < max_page; page_start += 80) {

            let page_stop = page_start + 80;

            if (page_stop > max_page) {
                page_stop = max_page;
            }

            let pages = Array.from({ length: page_stop - page_start }, (v, i) => i + page_start);

            try {
                await this.extended_erase_memory(pages);
            } catch (error) {
                throw new Error(error);
            }

            console.log("done");

            if (reporthook) reporthook(page_stop, max_page);
        }
    }

    async write(firmware, reporthook = null, start_address = START_ADDRESS) {
        let length = firmware.length;
        const step = 128;

        if (reporthook) reporthook(0, length);
        for (let offset = 0; offset < length; offset += step) {

            let offset_end = offset + step;

            if (offset_end > length) {
                offset_end = length;
            }

            let buffer = firmware.slice(offset, offset_end);

            try {
                await this.memory_write(start_address + offset, buffer);
            } catch (error) {
                throw new Error(error);
            }

            if (reporthook) reporthook(offset_end, length);
        }
    }

    async verify(firmware, reporthook = null, start_address = START_ADDRESS) {
        let length = firmware.length;
        const step = 128;

        if (reporthook) reporthook(0, length);

        for (let offset = 0; offset < length; offset += step) {

            let offset_end = offset + step;
            let read_length = step;

            if (offset_end > length) {
                offset_end = length;
                read_length = offset_end - offset;
            }

            let orig_buffer = firmware.slice(offset, offset_end);

            let i;

            for (i = 0; i < 2; i++) {

                let buffer;

                try {
                    buffer = await this.memory_read(start_address + offset, read_length);
                } catch (error) {
                    console.log('error: memory_read', error);
                    continue;
                }

                if (Buffer.from(orig_buffer).equals(buffer)) {
                    break;
                }
            }

            if (i == 2) {
                throw new Error('Not Match');
            }

            if (reporthook) reporthook(offset_end, length);
        }
    }

}

export default function flash(file_data, device = null, firmware_path = null, reporthook = null) {

    return new Promise(async (resolve, reject) => {

        var firmware_response = await fetch("/download_code");

        let firmware_buffer = await firmware_response.arrayBuffer();

        let firmware = new Uint8Array(firmware_buffer);

        var s = new FlashSerial(/*device*/);

        s.connect()
        .then(() => {
            console.log('erase');
            return s.erase(firmware.byteLength);
        })
        .then(() => {
            console.log('write');
            return s.write(firmware);
        })
        /*.then(() => {
            return s.verify(firmware);
        })*/
        .then(() => {
            console.log('go');

            return s.go();
        })
        .then(() => {
            return s.disconect();
        })
        .then(resolve)
        .catch((e) => {
            s.disconect().catch(()=>{});

            console.log('flash error', e);

            reject(e);
        });
    });
}