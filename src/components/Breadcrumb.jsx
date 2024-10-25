import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbC = ({ items }) => {
    const newItems = [{
        link: '/',
        title: <HomeOutlined />,
    }, ...items]
    return (
        < div className="py-2" >
            <Breadcrumb
                items={
                    newItems.map(item => ({
                        title: item.link ? <a href={item.link}>{item.title}</a> : item.title,
                    }))
                }
            />
        </div >
    );
}
export default BreadcrumbC;