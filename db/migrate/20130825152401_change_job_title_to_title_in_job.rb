class ChangeJobTitleToTitleInJob < ActiveRecord::Migration
  def up
    rename_column :jobs, :job_title, :title
  end

  def down
    rename_column :jobs, :title, :job_title
  end
end
