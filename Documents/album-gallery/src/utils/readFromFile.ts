import * as fs from 'fs'
import * as path from 'path'

export async function readImagesFromJson(filename: string): Promise<any[]> {
    try {
        const filePath = path.join(__dirname, `../assets/${filename}.json`)
        const data = fs.readFileSync(filePath, 'utf8')
        
        return JSON.parse(data)
    } catch (error) {
        throw new Error(`Error reading ${filename}.json: ${error}`)
    }
}