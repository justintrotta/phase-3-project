class Author < ActiveRecord::Base
    has_many :quotes
    has_many :completions, through: :quotes

    def my_quotes
        Quote.all.select(author_id: self.id)
    end

end