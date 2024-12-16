export class Timer {
  time: number;
  status: 'stopped' | 'running';
  passed: number;

  constructor (time: number, passed: number = 0, status: 'stopped' | 'running' = 'stopped') {
    this.time = Math.max(time, 0);
    this.passed = passed;
    this.status = status;
  }

  update (dt: number): Timer  {
    let passed = Math.min(this.passed + dt, this.time);

    let status: 'stopped' | 'running' = passed === this.time ? 'stopped' : 'running';
    passed = status === 'stopped' ? 0 : passed;

    return new Timer(this.time, passed, status);
  }

  start () {
    this.status = 'running'
  }

  isRunning () {
    return this.status === 'running';
  }

  isCompleted () {
    return this.status === 'stopped';
  }
}