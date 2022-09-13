import request from '@/utils/request';

export const fetchData = () => {
    return request({
        url: '/vue3-element-admin/mock/table.json',
        method: 'get'
    });
};
