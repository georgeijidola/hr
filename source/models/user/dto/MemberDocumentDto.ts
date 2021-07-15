import { Document } from "mongoose"

export interface memberDocumentDto extends Document<any> {
  [index: string]: unknown
  readonly user: string
  readonly firstName: string
  readonly lastName: string
  readonly type: string
  readonly tags: string[]
  readonly dOfC: number
  readonly title: string
  isDeleted: boolean
  deletedAt: Date
}
