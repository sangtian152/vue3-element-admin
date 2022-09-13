import request from '@/utils/request';

export const login = (data:Record<string, string>) => {
    return request({
        url: '/vue3-element-admin/mock/login.json',
        method: 'get',
        data
    });
};
