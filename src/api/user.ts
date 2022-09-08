import request from '@/utils/request';

export const login = (data:Record<string, string>) => {
    return request({
        url: '/mock/login.json',
        method: 'post',
        data
    });
};
