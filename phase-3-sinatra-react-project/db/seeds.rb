
puts "🌱 Seeding spices..."

file = File.open("./raw.txt")
file_data = file.read
i = 1

splits = file_data.split(/\n\n/)
splits.each do |x|
    y = x.split(/-- /)
    authorName = y[1]
    quoteText = y[0]
    if Author.where(name: authorName).present?
        Quote.create(text: quoteText, author_id: Author.find_by(name: authorName).attributes.values[0])
    else
        Quote.create(text: quoteText, author_id: i)
        Author.create(name: authorName, id: i)
    end
    i += 1
end

puts "✅ Done seeding!"
