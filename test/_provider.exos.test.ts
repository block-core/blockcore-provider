// import { AxiosError } from 'axios';
// import { Provider } from '../src/Provider'

// describe("Provider (EXOS) test suit", () => {
//   let provider: Provider;
//   const getSupplyMock = jest.fn();
//   const someResponse = {
//     data: {},
//     error: {} || undefined
//   }
//   beforeEach(() => {
//     provider = new Provider('https://exos.indexer.blockcore.net');
//     // provider.getSupply = getSupplyMock;
//   });

//   afterEach(() => jest.clearAllMocks());

//   it('should verify that exos network is correct', async () => {
//     const result: any = await provider.getSupply();

//     expect(result).toMatchObject(someResponse);
//     expect(result.data.total > 303049697).toBeTruthy();
//     expect(result.data.rewards > 2158270).toBeTruthy();
//     expect(result.data.height > 1618270).toBeTruthy();
//   })
// });
