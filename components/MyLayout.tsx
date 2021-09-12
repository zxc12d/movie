import React from 'react'
import {BackTop, Layout, Spin} from 'antd'
import MyHeader from './MyHeader'

const {Footer, Content} = Layout


const MyLayout: React.FC = ({children}) => {

    return (
        <Layout>
            <MyHeader/>
            <Content
                className={'px-2 w-full mt-20 md:w-2/3 lg:w-1/2 m-auto max-w-full'}
            >
                {children}
            </Content>

            <Footer className="flex flex-col justify-center items-center text-center">
                {/*<div className="pt-1">*/}
                {/*    合作邮箱：*/}
                {/*</div>*/}
            </Footer>
            <BackTop/>
        </Layout>
    )
}

export default MyLayout
