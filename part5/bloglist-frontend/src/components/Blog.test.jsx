import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('clicking the button calls event handler once', async () => {
  const blog = {
    'title': 'Updated Title',
    'author': 'Guido van Rossum',
    'url': 'blog.rust.com/borrow-checker',
    'likes': 824,
    'user': {
      'username': 'guido',
      'name': 'Guido van Rossum',
      'id': '6890a4d42af3f5808b65097e'
    },
    'id': '6890a4d42af3f5808b650988'
  }

  const mockLikeBlog = vi.fn()
  const mockDeleteBlog = vi.fn()

  render(<Blog
    key={blog.id}
    blog={blog}
    likeBlog={mockLikeBlog}
    deleteBlog={mockDeleteBlog}
    user={blog.user.username}
  ></Blog>)

  // start session to interact with rendered <Blog />
  const user = userEvent.setup()

  // initially "blog by author" title is rendered
  const title = `${blog.title} by ${blog.author}`
  const element = screen.getByText(title)
  expect(element).toBeDefined()

  // initially likes and url are not rendered
  expect(screen.queryByText(blog.likes)).toBeNull()
  expect(screen.queryByText(blog.url)).toBeNull()

})