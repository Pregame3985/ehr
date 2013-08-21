class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.integer :id
      t.string :job_title
      t.string :location

      t.timestamps
    end
  end
end
