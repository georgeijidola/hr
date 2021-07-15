import { Document } from "mongoose"

export interface titleDocumentDto extends Document<any> {
  readonly user: string
  readonly name: string
  isDeleted: boolean
  deletedAt: Date
}
