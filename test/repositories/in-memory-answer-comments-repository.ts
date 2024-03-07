import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find(
      (answerComment) => answerComment.id.toValue() === id,
    )

    if (!answerComment) return null

    return answerComment
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toValue() === answerComment.id.toValue(),
    )

    this.items.splice(itemIndex, 1)
  }

  async findManyByAnswerId(questionId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }
}
