import request from '@/utils/request';

export const getTreeData = (data:Record<string, string>) => {
    return request({
        url: '/mock/tree.json',
        method: 'post',
        data
    });
};
