import './editorStyles.scss'

import { EditorContent, useEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { useRef, useState } from 'react'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import codeBlock from '../../assets/codeblock.png'
import left from '../../assets/left.png'
import center from '../../assets/center.png'
import right from '../../assets/right.png'
import dotlist from '../../assets/dot.png'
import numberlist from '../../assets/number.png'
import image from '../../assets/image.png'
import { RiArrowGoBackLine } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri"
import { useAuth } from '../AuthComponents/AuthContext'


const MenuBar = ({ editor }) => {
    const hiddenFileInput = useRef(null);
    const { user, uploadFile } = useAuth()

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        uploadFile(fileUploaded, user.uid).
            then(url => {
                editor.chain().focus().setImage({ src: url, alt: 'Imagen no encontrada :(' }).run()
            })
    };

    if (!editor) {
        return null
    }

    return (
        <div className='buttons'>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBold().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active' : 'is-inactive'}
            >
                <strong>N</strong>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleItalic().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()

                }
                className={editor.isActive('italic') ? 'is-active' : 'is-inactive'}
            >
                <em>C</em>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleStrike().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active' : 'is-inactive'}
            >
                <s>T</s>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleUnderline().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleUnderline()
                        .run()
                }
                className={editor.isActive('underline') ? 'is-active' : 'is-inactive'}
            >
                <u>S</u>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleCode().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'is-active' : 'is-inactive'}
            >
                {'</>'}
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().unsetAllMarks().run()
            }}>
                <span>Eliminar marcas</span>
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setParagraph().run()
                }}
                className={editor.isActive('paragraph') ? 'is-active' : 'is-inactive'}
            >
                p
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : 'is-inactive'}
            >
                h1
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : 'is-inactive'}
            >
                h2
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }}
                className={editor.isActive('heading', { level: 3 }) ? 'is-active' : 'is-inactive'}
            >
                h3
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }}
                className={editor.isActive('heading', { level: 4 }) ? 'is-active' : 'is-inactive'}
            >
                h4
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }}
                className={editor.isActive('heading', { level: 5 }) ? 'is-active' : 'is-inactive'}
            >
                h5
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }}
                className={editor.isActive('heading', { level: 6 }) ? 'is-active' : 'is-inactive'}
            >
                h6
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleBulletList().run()
                }}
                className={editor.isActive('bulletList') ? 'is-active-img' : 'img'}
            >
                <img src={dotlist} style={{ minWidth: '26px', width: '26px' }} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleOrderedList().run()
                }}
                className={editor.isActive('orderedList') ? 'is-active-img' : 'ol'}
            >
                <img src={numberlist} style={{ minWidth: '24px', width: '24px' }} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().toggleCodeBlock().run()
                }}
                className={editor.isActive('codeBlock') ? 'is-active-img' : 'img'}
            >
                <img src={codeBlock} alt="" style={{ minWidth: '21.6px', width: '21.6px' }} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setTextAlign('left').run()
                }}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active-img' : 'img'}
            >
                <img src={left} style={{ minWidth: '22.3px', width: '22.3px' }} />
            </button>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setTextAlign('center').run()
                }}
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active-img' : 'img'}
            >
                <img src={center} style={{ minWidth: '25.2px', width: '25.2px' }} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setTextAlign('right').run()
                }}
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active-img' : 'img'}
            >
                <img src={right} style={{ minWidth: '24px', width: '24px' }} />
            </button>
            <button onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().setHardBreak().run()
            }}>
                \n
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().undo().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
                className={'img'}
            >
                <RiArrowGoBackLine size={'24px'} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().redo().run()
                }}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
                className={'img'}
            >
                <RiArrowGoForwardFill size={'24px'} />
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    hiddenFileInput.current.click();
                }}
                className={'img'}
            >
                <img src={image} alt="" style={{ minWidth: '27px', width: '27px' }} />
            </button>
            <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg" />
        </div>
    )
}

export default ({ post, setPost, setBodyText }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Image,
            Placeholder.configure({
                placeholder: 'Detalla tu pregunta...'
            })
        ],
        editable: true,
        onUpdate({ editor }) {
            setBodyText(editor.getText())
            setPost({ ...post, body: editor.getHTML() })
        },
    })

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}