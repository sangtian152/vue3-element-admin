import request from '@/utils/request';

export const getTreeData = (data:Record<string, string>) => {
    return request({
        url: '/vue3-element-admin/mock/tree.json',
        method: 'get',
        data
    });
};
