import { Document } from "mongoose"

export interface tagDocumentDto extends Document<any> {
  readonly user: string
  readonly name: string
  isDeleted: boolean
  deletedAt: Date
}
