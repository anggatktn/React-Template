import { apiClient, type ApiResponse } from '../utils/api/axios-client';
import { BaseService } from '../utils/base/BaseService';

/* 
{
  "type": "string",
  "layout_style": "large font",
  "ssn": "string",
  "description": "string",
  "size": "string"
}
*/

export interface NewSSNRequestBody {
    type: string;
    layout_style: string;
    ssn: string;
    description: string;
    size: string;
}

/* 
{
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "large font",
      "layout_style": "string",
      "ssn": "string",
      "description": "string",
      "size": "string",
      "sku": 0,
      "created_at": "2025-12-30T21:45:04.222Z",
      "updated_at": "2025-12-30T21:45:04.222Z"
    }
*/

export interface SSNItemResponse {
    id: string;
    type: string;
    layout_style: string;
    ssn: string;
    description: string;
    size: string;
    sku: number;
    created_at: string;
    updated_at: string;
}

export class SsnService extends BaseService {
    private readonly basePath = '/ssn';

    async getSSNList(): Promise<ApiResponse<SSNItemResponse[]>> {
        return this.execute(() => {
            const response = apiClient.get<SSNItemResponse[]>(this.basePath);
            return response;
        });
    }

    async createNewSSN(body: NewSSNRequestBody): Promise<ApiResponse<SSNItemResponse>> {
        return this.execute(() => {
            const response = apiClient.post<SSNItemResponse>(this.basePath, body);
            return response;
        });
    }
}

export const ssnService = new SsnService();

