class Event < ActiveRecord::Base
  attr_accessible :id, :run_at, :title
end
