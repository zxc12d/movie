import {useContext, useState} from "react";
import Link from 'next/link'
import {GlobalCxt} from "../pages/_app";
import {useRouter} from "next/router";
import {SearchOutlined} from "@ant-design/icons";
import {get} from "../utils";
import {CommonResponse, Vod} from "../types";

const MyHeader = () => {
    const global = useContext(GlobalCxt)
    const router = useRouter()
    const [searchValue, setSearchValue] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [searchResult, setSearchResult] = useState<Vod[]>()
    const handleSearch = async () => {
        let res: CommonResponse<Vod> = await get('/provide/vod/?ac=list&wd=' + searchValue)
        setSearchResult(res.list)
        setShowSearch(true)
    }

    const handleDoSearch = async (id: number) => {
        setSearchResult(undefined)
        setShowSearch(false)
        setSearchValue('')
        await router.push('/' + id)

    }
    // if (isError) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>

    return <div className={'bg-gray-900  text-white flex h-14 items-center'}>
        <div className={'w-full md:w-2/3 px-2 flex justify-between mx-auto items-center'}>
            <Link href={'/'} passHref={true}>
                <a className={'w-2/3 text-2xl cursor-pointer'}>
                    <div>猫视频</div>
                </a>
            </Link>
            <div className={'bg-gray-700 flex flex-auto relative justify-around items-center rounded-full h-8'}>
                <input value={searchValue}
                       onChange={(e) => setSearchValue(e.target.value)}
                       onKeyPress={async e => {
                           if (e.key === 'Enter') {
                               await handleSearch()
                           }
                       }}
                       className={'bg-gray-700 w-2/3 focus:outline-none'}/>
                <SearchOutlined onClick={handleSearch} style={{fontSize: '18px', color: '#08c'}}/>
                {showSearch ? <div className={'absolute z-10 bg-gray-600 w-2/3 left-0 top-full mt-1 px-4 py-2 rounded'}>
                    {searchResult?.map(i =>
                        <div onClick={() => handleDoSearch(i.vod_id)}
                             className={'cursor-pointer pb-2 hover:bg-gray-400'} key={i.vod_id}>
                            {i.vod_name}
                        </div>
                    )}
                </div> : null}
            </div>


        </div>
    </div>
}

export default MyHeader;