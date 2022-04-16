import { JwtAuthGuard } from './jwt-auth.guard';

describe('JetAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
