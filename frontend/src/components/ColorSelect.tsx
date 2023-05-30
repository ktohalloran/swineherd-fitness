import { Contributor } from "../models"

interface ColorSelectProps {
    readonly contributors: Contributor[]
}

const ColorSelect = ({contributors}: ColorSelectProps) => {
    const uniqueColors: string[] = [...new Set(contributors.map(contributor => contributor.user_color))]
    return (
        <select>
            <option>{contributors.length > 0 ? uniqueColors[0] : "No contributors available"}</option>
            {uniqueColors.map((option, index) => {
                return <option key={index}>
                    {option}
                </option>
            })}
        </select>
    )
}

export default ColorSelect;