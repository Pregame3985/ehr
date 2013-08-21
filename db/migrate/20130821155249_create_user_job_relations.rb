class CreateUserJobRelations < ActiveRecord::Migration
  def change
    create_table :user_job_relations do |t|
      t.integer :user_id
      t.integer :job_id

      t.timestamps
    end
  end
end
