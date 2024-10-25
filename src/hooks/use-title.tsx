import { useEffect, useRef } from 'react';

export const useDocumentTitle = (title, keepAlive = true) => {
	// 获取当前最新的 document.title 值
	const oldTitle = useRef(document.title).current;
	useEffect(()=>{
		// 根据传入的 title 更新 document.title
		document.title = title
	}, [title])
	useEffect(() => {
		return () => {
			if(!keepAlive){
				// 如果在组件销毁的时候不保留传入的 title,则需要手动卸载传入的 title
				document.title = oldTitle
			}
		}
	}, [keepAlive, oldTitle])
}
