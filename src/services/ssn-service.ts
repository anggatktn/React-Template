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

export class SsnService extends BaseService {
    private readonly basePath = '/ssn';

    async getSSNList(): Promise<ApiResponse<any>> {
        return this.execute(() => {
            const response = apiClient.get<any>(this.basePath);
            return response;
        });
    }

    async createNewSSN(body: NewSSNRequestBody): Promise<ApiResponse<any>> {
        return this.execute(() => {
            const response = apiClient.post<any>(this.basePath, body);
            return response;
        });
    }
}

export const ssnService = new SsnService();

