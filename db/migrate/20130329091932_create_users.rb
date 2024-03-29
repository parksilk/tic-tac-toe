class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_hash
      t.string :anonymous
      t.string :session_token
      t.string :username
      t.timestamps
    end
  end
end
