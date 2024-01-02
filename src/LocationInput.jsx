//import T from 'prop-types'
import { useState } from "react"
//eslint-disable-next-line react/prop-types
export default function LocationInput({setLocation}) {
	const [value, setValue] = useState("Omsk")
	return (
		<>
			<input value={value} onChange={(event) => setValue(event.target.value)}></input>
			<button onClick={() => setLocation(value)}>Submit</button>
		</>
	)
}

