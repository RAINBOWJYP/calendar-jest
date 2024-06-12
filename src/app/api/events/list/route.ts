import { getEventList } from '@/app/lib/events'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const limit = searchParams.get('limit') || '10'
    const offset = searchParams.get('offset') || '0'
    const limitNum = parseInt(limit, 10)
    const offsetNum = parseInt(offset, 10)
    try {
        const events = await getEventList(limitNum, offsetNum)
        return NextResponse.json(events)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        )
    }
}
