import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { get1, post1 } from '../../utils'
import { List } from 'antd'
import Link from 'next/link'

export interface PostInterface {
    id: number
    title: string
    content: string
    vodId: number
    createTime: string
    updateTime: string
}

export const getStaticProps: GetStaticProps = async () => {
    let res = await post1(`/post/page`, { current: 1, size: 50 })
    console.log('static props:', res)

    return {
        props: {
            posts: res.data.records as PostInterface[],
        },
        revalidate: 3600, //1h
    }
}

const PostList = ({
    posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <div className="mb-5 text-3xl">资讯列表:</div>
            <List
                dataSource={posts}
                itemLayout="vertical"
                renderItem={(item: PostInterface) => (
                    <List.Item>
                        <Link href={`/posts/${item.id}`}>
                            <a>
                                <div className="text-2xl font-bold">
                                    {item.title}
                                </div>
                            </a>
                        </Link>
                        {/* <List.Item.Meta title={item.title} /> */}
                    </List.Item>
                )}
            />
        </>
    )
}

export default PostList
