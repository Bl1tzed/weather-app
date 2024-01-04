//import T from 'prop-types'
import { useState } from "react"
//eslint-disable-next-line react/prop-types
export default function LocationInput({setLocation}) {
	const [search, setSearch] = useState("")
	return (
		<>
			<input
				value={search} 
				onChange={(event) => setSearch(event.target.value)}
				placeholder="Search for city"
			>

			</input>
			<button className="search-button" onClick={() => setLocation(search)}>Submit</button>
		</>
	)
}

