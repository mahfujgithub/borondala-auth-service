import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT || 5000,
  defaultAdminAndSellerPassword: process.env.DEFAULT_ADMIN_AND_SELLER_PASSWORD,
}
