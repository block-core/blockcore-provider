import { AxiosError } from 'axios';
import { Provider } from '../src/Provider'

describe("Provider test suit", () => {
  let provider: Provider;
  const getSupplyMock: any = jest.fn();
  const someResponse = {
    data: {},
    error: {} || undefined
  }
  beforeEach(() => {
    provider = new Provider();
    // provider.getSupply = getSupplyMock;
  });

  afterEach(() => jest.clearAllMocks());

  // it('should match data and error object for each API call with no parameters', async () => {
  // [
  //   provider.getSupply(),
  //   provider.getCirculatingSupply(), 
  //   provider.getTotalSupply(),
  //   provider.getWallets(),
  //   provider.getRichList(),
  //   provider.getMempoolTransactions(),
  //   provider.getMempoolTransactionsCount(),
  //   provider.getBlock(),
  //   provider.getLatestBlock()
  // ]
  // .forEach(async call => {    
  //   return expect(call).resolves.toMatchObject(someResponse)
  // })

  // })
  // it('should return a data and error object when calling getAddress Provider method', async () => {
  //   return expect(provider.getAddress(getSupplyMock)).resolves.toMatchObject(someResponse);
  // })

  it('should get networks', async () => {
    let result: any = await provider.getNetworks();
    expect(result.data[0].symbol).toMatch('BTC');
  })

  it('should get correct network url', async () => {
    let result = await provider.getNetworkUrl('CITY');
    expect(result).toMatch('https://city.indexer.blockcore.net');

    result = await provider.getNetworkUrl('EXOS');
    expect(result).toMatch('https://exos.indexer.blockcore.net');

    const provider2 = new Provider('https://custom.indexer.blockcore.net');
    expect(provider2.getBaseUrl()).toMatch('https://custom.indexer.blockcore.net');
  })

  it('should test getSupply method', async () => {
    const result: any = await provider.getSupply();

    expect(result).toMatchObject(someResponse);
    expect(result.data.total > 303049697).toBeTruthy();
    expect(result.data.rewards > 2158270).toBeTruthy();
    expect(result.data.height > 1218270).toBeTruthy();
  })

  it('should test if getCirculatingSupply method returns a number', async () => {
    const result: any = await provider.getCirculatingSupply();

    expect(result).toMatchObject(someResponse);
    expect(result.data).not.toBeNaN()
  })

  it('should test if getTotalSupply method returns a number', async () => {
    const result: any = await provider.getTotalSupply();

    expect(result).toMatchObject(someResponse);
    expect(result.data).not.toBeNaN()
  })

  it('should test if getEstimateRewards method returns a number', async () => {
    const result: any = await provider.getEstimateRewards();

    expect(result).toMatchObject(someResponse);
    expect(result.data).not.toBeNaN()
  })

  it('should test if getWallets method returns an object containing Burnt account', async () => {
    const result: any = await provider.getWallets();

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "name": "Burnt",
          "type": "Burn",
          "initialAmount": 0.0,
        })
      ])
    )
  })

  it('should call getRichList and contain a handpicked random account', async () => {
    const someAddress = {
      "address": "CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV",
    }
    const result: any = await provider.getRichList();

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(expect.arrayContaining([expect.objectContaining(someAddress)]))
  })

  it('should test if getAddress method returns the address passed as argument', async () => {

    const result: any = await provider.getAddress("CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV");
    const someAddress = {
      "address": "CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV",
    }

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(expect.objectContaining(someAddress))
  })

  it('should test if getAddressTransactions method returns the address transactions passed as argument', async () => {

    const result: any = await provider.getAddressTransactions("CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV");

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "symbol": "CITY",
          "blockHash": "ecb1aca33af0bb4885b3fc898efbabe5cbcf58e77d7d20bde5cc51ced75bbbb9",
          "blockIndex": 1339023,
          "timestamp": 1631468016,
          "transactionId": "6ea66e4ae9c3f19b9e410de16f71ed6ec4b0e7111d8ed3083f0b6c5c43093510"
        })
      ])
    )
  })

  it('should test if getAddressUnconfirmedTransactions method returns the address unconfirmed transactions passed as argument', async () => {

    const result: any = await provider.getAddressUnconfirmedTransactions("CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV");

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "symbol": "CITY",
          "blockHash": "ecb1aca33af0bb4885b3fc898efbabe5cbcf58e77d7d20bde5cc51ced75bbbb9",
          "blockIndex": 1339023,
          "timestamp": 1631468016,
          "transactionId": "6ea66e4ae9c3f19b9e410de16f71ed6ec4b0e7111d8ed3083f0b6c5c43093510"
        })
      ])
    )
  })

  it('should test if getAddressSpentTransactions method returns the address spent transactions passed as argument', async () => {

    const result: any = await provider.getAddressSpentTransactions("CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV");

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "symbol": "CITY",
          "blockHash": "f1cda3861b642fa6ee188655f53c8f209c0a2033f5105aa350e73f92da3b74fe",
          "blockIndex": 1333716,
          "timestamp": 1631112128,
          "transactionId": "8de7841ac0944e00fcc03436b4d08c17218bcb21f71b3bcb2a0f99ba3185ff6f",
        })
      ])
    )
  })

  it('should test if getAddressUnspentTransactions method returns the address unspent transactions passed as argument', async () => {

    const result: any = await provider.getAddressUnspentTransactions("CbFj5PM6oxUBBUM3LBejPFx4LZSnLJK6ZV");

    expect(result).toMatchObject(someResponse);
    expect(result.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "symbol": "CITY",
          "blockHash": "ecb1aca33af0bb4885b3fc898efbabe5cbcf58e77d7d20bde5cc51ced75bbbb9",
          "blockIndex": 1339023,
          "timestamp": 1631468016,
          "transactionId": "6ea66e4ae9c3f19b9e410de16f71ed6ec4b0e7111d8ed3083f0b6c5c43093510"
        })
      ])
    )
  })

});
