class CreateCompanyJobRelations < ActiveRecord::Migration
  def change
    create_table :company_job_relations do |t|
      t.integer :company_id
      t.integer :job_id

      t.timestamps
    end
  end
end
