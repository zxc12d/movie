//电影来自远方
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { get1, post1 } from '../../utils'

export const getStaticPaths: GetStaticPaths = async () => {
    let res = await post1(`/post/page`, { current: 1, size: 50 })
    let paths = res.data.records.map((i: any) => ({
        params: { id: '' + i.id },
    }))

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let id = params!.id
    let res = await get1(`/post/${id}`)
    console.log('static props:', res)

    return {
        props: {
            post: res.data,
        },
    }
}

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <div className="mt-4 mb-8 text-4xl font-extrabold ">
                {post.title}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>

            <div>
                链接：
                <Link href="/81523">
                    <a>来自远方</a>
                </Link>
            </div>
        </>
    )
}

export default Post
