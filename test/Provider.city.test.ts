import { AxiosError } from 'axios';
import { Provider } from '../src/Provider'

describe("Provider (CITY) test suit", () => {
  let provider: Provider;
  const getSupplyMock = jest.fn();
  const someResponse = {
    data: {},
    error: {} || undefined
  }
  beforeEach(() => {
    provider = new Provider('http://city.indexer.blockcore.net');
    // provider.getSupply = getSupplyMock;
  });

  afterEach(() => jest.clearAllMocks());

  it('should verify that city chain network is correct', async () => {
    const result: any = await provider.getSupply();

    expect(result).toMatchObject(someResponse);
    expect(result.data.total > 13762606311).toBeTruthy();
    expect(result.data.rewards > 24854552).toBeTruthy();
    expect(result.data.height > 1338666).toBeTruthy();
  })

  it('should get block by index', async () => {
    const result: any = await provider.getBlockByIndex('1');

    expect(result.data.blockHash).toMatch('10ff8948145eab119c528301e44316a977b6adb2d82526f44f296b02370a6d41');
    expect(result.data.nonce === 16639).toBeTruthy();
  })

  it('should get transaction by id', async () => {
    const result: any = await provider.getTransactionById('f75756e8cd24e5c15c2f68a1a9eb2e6299ad8dd6e196940b27d8c933a1654c96'); // Block 50000

    expect(result.data.symbol).toMatch('CITY');
    expect(result.data.blockHash).toMatch('3ef76cbcd4c125bfab252f20e11cdec64a495b1c3d6caa77d407f1e0420f71e7');
    expect(result.data.blockIndex === 50000).toBeTruthy();
    expect(result.data.transactionId).toMatch('f75756e8cd24e5c15c2f68a1a9eb2e6299ad8dd6e196940b27d8c933a1654c96');
  })
});
