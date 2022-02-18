class Quote < ActiveRecord::Base
    belongs_to :author
    has_many :completions 

end