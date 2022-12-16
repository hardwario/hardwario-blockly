"use strict";

export class SerialPortFtdi {
    constructor(device, baudrate=115200) {
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.clear_buffer = this.clear_buffer.bind(this);
        this.reset_sequence = this.reset_sequence.bind(this);
        this.boot_sequence = this.boot_sequence.bind(this);

        this.write = this.write.bind(this);

    }

    async write(buffer) {
        await this.writer.write(buffer);
    }

    open() {
        return new Promise(async (resolve, reject) => {
            var ports = await navigator.serial.getPorts();
            this.port = ports[0];
            await this.port.open({ baudRate: 115200, stopBits: 1, dataBits: 8, parity: 'even' });
            this.reader = this.port.readable.getReader();
            this.writer = this.port.writable.getWriter();


            resolve();
    
            /*this.write = this._ser.write.bind(this._ser);
            this.read = this._ser.read.bind(this._ser);
            this.flush = this._ser.flush.bind(this._ser);*/

            this.clear_buffer()
                    .then(resolve)
                    .catch(reject);
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.writer.releaseLock();
			this.reader.releaseLock();
            this.port.close((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    clear_buffer() {
        return new Promise((resolve) => {
            this._ser.flush()
                .then(() => { return this._ser.drain() })
                .then(() => { return resolve(true); });
        });
    }

    async reset_sequence() {
        await port.setSignals({ requestToSend: true,  dataTerminalReady: false });
        await new Promise(resolve => setTimeout(resolve, 100));
        await port.setSignals({ requestToSend: true,  dataTerminalReady: true });
        return true;
    }

    async boot_sequence() {
        await this.port.setSignals({ requestToSend: false,  dataTerminalReady: false });
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.port.setSignals({ requestToSend: true,  dataTerminalReady: false });
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.port.setSignals({ requestToSend: true,  dataTerminalReady: true });
        await this.port.setSignals({ requestToSend: false,  dataTerminalReady: true });
        await new Promise(resolve => setTimeout(resolve, 100));
        await this.port.setSignals({ requestToSend: true,  dataTerminalReady: true });
        return true;
    }
}