import { AxiosError } from 'axios';
import { Provider } from '../src/Provider'

describe("Provider test suit", () => {
  let provider: Provider;
  const getSupplyMock = jest.fn();
  const someResponse = {
    data: {},
    error: {} || undefined
  }
  beforeEach(() => {
    provider = new Provider();
    // provider.getSupply = getSupplyMock;
  });
  
  afterEach(() => jest.clearAllMocks());
  
  
  it('should receive and object with data and error', async () => {
    const result = await provider.getSupply();
    
    expect(result).toMatchObject(someResponse)
  })
});
