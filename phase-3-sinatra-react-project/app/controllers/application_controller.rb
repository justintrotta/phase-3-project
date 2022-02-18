class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/authors" do
    Author.all.to_json(include: :quotes)
  end

  get "/quotes" do
    Quote.all.to_json(include: :author)
  end

  get "/quotes/:id" do
    Quote.find(params[:id]).to_json(include: :author)
  end

  get "/completions" do 
    Completion.all.to_json(include: :quotes)
  end

  post "/quotes" do
    completion = Completion.create(
      text: params[:text],
      author_id: params[:author_id],
      quote_id: params[:quote_id]
    )
    completion.to_json
  end

  delete "/completions/:id" do
    completion = Completion.find(params[:id])
    completion.destroy
    completion.to_json
  end

end
