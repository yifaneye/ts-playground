import { beforeEach, describe, it, expect } from 'vitest';
import { fireEvent } from '@testing-library/dom';
import { setupCounter } from './main';

describe('setupCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="increaseByOne">+1</button>
      <button id="decreaseByOne">-1</button>
      <button id="increaseByTwo">+2</button>
      <button id="decreaseByTwo">-2</button>
      <div id="counter-value"></div>
    `;
    setupCounter(document.getElementById('counter-value') as HTMLElement);
  });

  it('starts at 0', () => {
    expect(document.getElementById('counter-value')!.textContent).toBe('0');
  });

  it('increments by 1', () => {
    fireEvent.click(document.getElementById('increaseByOne')!);
    expect(document.getElementById('counter-value')!.textContent).toBe('1');
  });

  it('decrements by 1', () => {
    fireEvent.click(document.getElementById('decreaseByOne')!);
    expect(document.getElementById('counter-value')!.textContent).toBe('-1');
  });

  it('increments by 2', () => {
    fireEvent.click(document.getElementById('increaseByTwo')!);
    expect(document.getElementById('counter-value')!.textContent).toBe('2');
  });

  it('decrements by 2', () => {
    fireEvent.click(document.getElementById('decreaseByTwo')!);
    expect(document.getElementById('counter-value')!.textContent).toBe('-2');
  });

  it('wraps around near 100', () => {
    const inc = document.getElementById('increaseByOne')!;
    for (let i = 0; i < 99; i++) fireEvent.click(inc);
    expect(document.getElementById('counter-value')!.textContent).toBe('99');
    fireEvent.click(document.getElementById('increaseByTwo')!);
    expect(document.getElementById('counter-value')!.textContent).toBe('1');
  });
});
