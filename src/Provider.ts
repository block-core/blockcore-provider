/* eslint-disable prettier/prettier */
import axios, { AxiosError } from "axios";
export class Provider {
  private baseUrl: string;

  public constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || 'http://city.indexer.blockcore.net';
  }

  public async getSupply<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    let response: TResponse  = { data: undefined }
    await axios.get(this.baseUrl + "/api/insight/supply")
    .then((res) => {
      response = {
        data: res.data,
        error: undefined
      }
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

   public async getCirculatingSupply<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(this.baseUrl + "/api/insight/supply/circulating")
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }
    public async getTotalSupply<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(this.baseUrl + "/api/insight/supply/total")
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getEstimateRewards<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(this.baseUrl + "/api/insight/rewards")
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }
 public async getWallets<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(this.baseUrl + "/api/insight/wallets")
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

 public async getRichList<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(this.baseUrl + "/api/insight/richlist")
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getAddress<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/address/${address}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

   public async getAddressTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/address/${address}/transactions`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

   public async getAddressUnconfirmedTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/address/${address}/transactions/unconfirmed`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

   public async getAddressSpentTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/address/${address}/transactions/spent`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getAddressUnspentTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/address/${address}/transactions/unspent`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getMempoolTransactions<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/mempool/transactions`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getMempoolTransactionsCount<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/mempool/transactions/count`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }
  public async getTransactionsById<AxiosResponse>(id: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/transactions/${id}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getBlock<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/block`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

  public async getBlockTransactionsByHash<AxiosResponse>(hash: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/block/${hash}/transactions`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }
 
  public async getBlockByHash<AxiosResponse>(hash: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/block/${hash}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

   public async getBlockByIndex<AxiosResponse>(index: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/block/index/${index}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }
 
  public async getBLockTransactionsByIndex<AxiosResponse>(index: string): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/block/index/${index}/transactions`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }

   public async getLatestBlock<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    type TResponse = {
      data: unknown | undefined
      error?: AxiosError; 
    }
    const response: TResponse  = { data: undefined }
    await axios.get(`${this.baseUrl}/api/query/block/latest`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error
     })
     
    return response as unknown as AxiosResponse;
 }
}
