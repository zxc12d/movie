import React from 'react'
import {BackTop, Layout, Spin} from 'antd'
import MyHeader from './MyHeader'

const {Footer, Content} = Layout


const MyLayout: React.FC = ({children}) => {

    return (
        <Layout>
            <MyHeader/>
            <Content
                className={'px-2 w-full md:w-3/5 mt-5 m-auto'}
            >
                {children}
            </Content>

            <Footer className="flex flex-col justify-center items-center text-center">
                <div className="pt-1">
                    合作邮箱：sje9515@gmail.com
                </div>
            </Footer>
            <BackTop/>
        </Layout>
    )
}

export default MyLayout
