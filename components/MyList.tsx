import Image from "next/image";
import {Pagination} from "antd";
import {VodAndDetail} from "../pages";

interface Props {
    data: VodAndDetail[],
    page: number,
    handleChangePage: (v: number) => void,
    total: number
}

const MyList = ({data, page, handleChangePage, total}: Props) => {
    return <div>
        <div className={'flex flex-wrap items-center mb-5'}>
            {data?.map(i => <div className={'flex flex-col justify-center items-center mr-2'} key={i.vod_id}>
                <Image src={i?.vod_pic} alt={i.vod_name} width={200} height={300}/>
                <div>{i?.vod_name}</div>
            </div>)}
        </div>

        {/* 分页*/}
        <Pagination showQuickJumper current={+page!} pageSize={20} showSizeChanger={false} total={total}
                    onChange={handleChangePage}/>
    </div>
}

export default MyList