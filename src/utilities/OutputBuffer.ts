import { Writable } from 'stream';

export class OutputBuffer extends Writable {
  private buffer = '';

  _write(chunk: any, _encoding: string, callback: () => void) {
    this.buffer += chunk.toString();
    callback();
  }

  toString() {
    return this.buffer.trim();
  }
}
