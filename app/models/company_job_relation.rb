class CompanyJobRelation < ActiveRecord::Base
  attr_accessible :company_id, :job_id

  belongs_to :company
  belongs_to :job

end
