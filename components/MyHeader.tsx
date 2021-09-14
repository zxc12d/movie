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
    const [isEditing, setIsEditing] = useState(false)

    const hideSearchResult = () => {
        setSearchResult(undefined)
        setShowSearch(false)
        setIsEditing(false)
        setSearchValue('')
    }

    const handleSearch = async () => {
        let res: CommonResponse<Vod> = await get('/provide/vod/?ac=list&wd=' + searchValue)
        setSearchResult(res.list)
        setShowSearch(true)
    }

    const handleDoSearch = async (id: number) => {
        hideSearchResult()
        await router.push('/' + id)

    }

    return <div className={'bg-gray-900  text-white flex h-14 items-center'}>
        <div className={'w-full md:w-2/3 px-3 flex justify-between mx-auto items-center'}>
            <Link href={'/'} passHref={true}>
                <a className={'flex-grow text-2xl cursor-pointer'}>
                    <div>猫视频</div>
                </a>
            </Link>
            <div className={`${isEditing?'flex-auto':''} transition-all duration-500  bg-gray-700 flex px-3 relative justify-between items-center rounded-full h-8`}>
                <input value={searchValue}
                       onChange={(e) => {
                           setSearchValue(e.target.value)
                       }}
                       onFocus={() => {setIsEditing(true)}}
                       onBlur={()=>setIsEditing(false)}
                       onKeyPress={async e => {
                           if (e.key === 'Enter') {
                               await handleSearch()
                           }
                       }}
                       className={'bg-gray-700 focus:outline-none ml-2'}/>
                <SearchOutlined onClick={handleSearch} style={{fontSize: '18px', color: '#08c'}}/>

                {showSearch ? <div className={'absolute z-10 bg-gray-600 w-48 left-0 top-full mt-1 px-4 py-2 rounded'}>
                    {searchResult !== null && (searchResult?.length || 0 > 0) && searchResult?.map(i =>
                        <div onClick={() => handleDoSearch(i.vod_id)}
                             className={'cursor-pointer pb-2 hover:bg-gray-400 overflow-ellipsis truncate border-b'} key={i.vod_id}>
                            {i.vod_name}
                        </div>
                    ) || <div>没找到资源哦~</div>}
                </div> : null}

            </div>
            <div onClick={hideSearchResult} className={`pl-1 cursor-pointer ${searchValue ? 'visible' : 'invisible'}`}>取消
            </div>
        </div>
    </div>
}

export default MyHeader;