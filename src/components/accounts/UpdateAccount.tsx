import { useState } from 'react'
import useForm from '../../hooks/useForm'
import { CurrentUser, IUpdateAccount } from '../../types'
import ImageInput from '../inputs/ImageInput'
import { Input } from '../inputs/Input'

interface UpdateAccountProps {
    currentUser: CurrentUser
}

const UpdateAccount: React.FC<UpdateAccountProps> = ({ currentUser }) => {
    const { form, onFormChange, validateIfEmpty } = useForm<IUpdateAccount>(
        {
            name: currentUser.name,
            email: currentUser.email,
        },
        [currentUser]
    )

    const [imageUrl, setImageUrl] = useState<string>('')

    function onImageChosen(e: React.ChangeEvent<HTMLInputElement>) {
        let file = e.target.files?.length ? e.target.files[0] : null
    }

    return (
        <div className="space-y-3">
            <Input
                id="name"
                type="text"
                name="name"
                label="Username"
                required={false}
                // disabled={false}
                onChange={onFormChange}
                value={form.name}
            />
            <Input
                id="email"
                type="email"
                name="email"
                label="Email"
                required={false}
                // disabled={false}
                onChange={onFormChange}
                value={form.email}
            />
            <ImageInput
                id="image"
                name="avatar"
                label="Avatar"
                required={false}
                imageUrl={imageUrl}
                // disabled={false}
                onChange={onImageChosen}
            />
        </div>
    )
}

export default UpdateAccount
