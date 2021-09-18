import Link from 'next/link'
import Image from 'next/image'

//列表项
export const MovieItem = ({
    img,
    id,
    title,
}: {
    img: string
    id: number
    title: string
}) => {
    return (
        <Link href={`/${id}`}>
            <a>
                <div className="flex flex-col justify-center items-center  cursor-pointer relative transform hover:scale-110 duration-500  ">
                    <Image
                        src={img}
                        alt={title}
                        width={160}
                        height={240}
                        className="hover:scale-125 transform duration-500"
                    />
                    <div
                        className={
                            'truncate w-40 text-center text-xl my-2 mb-10'
                        }
                    >
                        {title}
                    </div>
                </div>
            </a>
        </Link>
    )
}

export default MovieItem
