import { describe, expect, it } from 'vitest';
import { expedienteExtras } from './expediente-extras';
import { getExpediente } from './expedientes';

describe('expedienteExtras', () => {
  it('cada extra apunta a un expediente que existe', () => {
    const huerfanos = Object.keys(expedienteExtras).filter((id) => getExpediente(id) === undefined);
    expect(huerfanos).toEqual([]);
  });
});
