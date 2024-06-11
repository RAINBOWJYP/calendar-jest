import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Modal from './Modal'

const meta = {
    title: 'Common/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        onClick: () => {
            console.log('hhh')
        },
        children: <p>안녕</p>,
    },
}
